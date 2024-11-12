from fastapi import FastAPI, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi import Request
from pydantic import BaseModel
from typing import List
from src.user import User
from src.location import Location
from src.space import Space
from src.booking import Booking
from src.review import Review
from src.admin import Administrator
from src.client import Client
from fastapi.middleware.cors import CORSMiddleware
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from src.config import db_config

app = FastAPI()


origins = [
    "http://localhost:3000",  # Add your frontend URL here
    "http://localhost:8000",  # Backend URL (for API calls)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow requests from these origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.mount("/images", StaticFiles(directory=os.path.join("..", "static", "images")), name="images")
template_dir = os.path.join(os.path.dirname(__file__), "../front/html")

templates = Jinja2Templates(directory=os.path.abspath(template_dir))


async def startup():
    pool = await aiomysql.create_pool(**db_config)
    app.state.db_pool = pool
    spaces = await Space.view_all_spaces(pool)


@app.get("/", response_class=HTMLResponse)
async def read_home(request: Request):

    return templates.TemplateResponse("index.html", {"request": request})


class UserCreateRequest(BaseModel):
    email: str
    password: str


class UserUpdateRequest(BaseModel):
    username: str


class LocationRequest(BaseModel):
    country: str
    country_code: str


class SpaceRequest(BaseModel):
    id_usr: int
    id_local: int
    price: float
    space_name: str
    space_desc: str
    space_photo: str
    rooms: int
    max_people: int
    area: float
    address: str
    latitude: float
    longitude: float


@app.post("/users/login")
async def login(user_request: UserCreateRequest):
    try:
        user = await User.login(user_request.email, user_request.password, db_config)
        return {"id_usr": user.id_usr, "username": user.username}
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid credentials")


@app.put("/users/{user_id}/username")
async def update_username(user_id: int, user_update: UserUpdateRequest):
    user = await User.view_user(user_id, db_config)
    if user:
        await user.change_username(user_update.username, db_config)
        return {"message": "Username updated successfully"}
    raise HTTPException(status_code=404, detail="User not found")


@app.post("/locations")
async def create_location(location_request: LocationRequest):
    location = Location(country=location_request.country, country_code=location_request.country_code)
    await location.insert(db_config)
    return {"message": "Location created successfully"}


@app.get("/locations/{location_id}")
async def get_location(location_id: int):
    location = await Location.get_location_by_id(location_id)
    if location:
        return location
    raise HTTPException(status_code=404, detail="Location not found")


@app.post("/spaces")
async def create_space(space_request: SpaceRequest):
    space = Space(
        id_usr=space_request.id_usr,
        id_local=space_request.id_local,
        price=space_request.price,
        space_name=space_request.space_name,
        space_desc=space_request.space_desc,
        space_photo=space_request.space_photo,
        rooms=space_request.rooms,
        max_people=space_request.max_people,
        area=space_request.area,
        address=space_request.address,
        latitude=space_request.latitude,
        longitude=space_request.longitude
    )
    await space.insert(db_config)
    return {"message": "Space created successfully"}


@app.get("/spaces")
async def get_spaces():
    spaces = await Space.view_all_spaces()  # This should return a list of all spaces
    return spaces


@app.get("/spaces/{space_id}")
async def get_space(space_id: int):
    space = await Space.view_all_spaces()  # You could change this to fetch by ID if needed
    if space:
        return space
    raise HTTPException(status_code=404, detail="Space not found")


@app.get("/spaces/user/{user_id}")
async def get_spaces_by_user(user_id: int):
    spaces = await Space.view_spaces_by_user(user_id)
    return spaces


@app.get("/bookings/{user_id}")
async def get_bookings(user_id: int):
    bookings = await Booking.view_bookings(user_id)
    return bookings


@app.post("/clients/{user_id}/change-description")
async def change_client_description(user_id: int, description: str):
    user = await User.view_user(user_id, db_config)
    if user:
        client = Client(user=user, description=description)
        await client.change_description(description)
        return {"message": "Description updated"}
    raise HTTPException(status_code=404, detail="User not found")


@app.post("/administrator/suspend-user")
async def suspend_user(user_id: int, reason: str):
    admin = Administrator(user=await User.view_user(user_id, db_config))
    success = await admin.suspend_user(user_id, reason, db_config)
    if success:
        return {"message": "User suspended successfully"}
    raise HTTPException(status_code=400, detail="Error suspending user")


@app.post("/administrator/delete-user")
async def delete_user(user_id: int, reason: str):
    admin = Administrator(user=await User.view_user(user_id, db_config))
    success = await admin.delete_user(user_id, reason, db_config)
    if success:
        return {"message": "User deleted successfully"}
    raise HTTPException(status_code=400, detail="Error deleting user")


@app.get("/administrator/search-user/{username}")
async def search_user(username: str):
    admin = Administrator(user=None)
    users = await admin.search_user(username)
    return users
