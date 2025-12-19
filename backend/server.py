from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from models import PropertyModel, PropertyListResponse

load_dotenv()

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client.kora_db
properties_collection = db.properties


@app.get("/")
async def read_root():
    return {"message": "Kora Backend API Running"}


@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}


@app.get("/api/properties", response_model=PropertyListResponse)
async def get_properties():
    properties = await properties_collection.find().to_list(1000)
    return {"properties": properties}


@app.get("/api/properties/{property_id}", response_model=PropertyModel)
async def get_property(property_id: str):
    property = await properties_collection.find_one({"id": property_id})
    if property:
        return property
    raise HTTPException(status_code=404, detail="Property not found")


# Seeding Endpoint
@app.post("/api/seed")
async def seed_properties():
    # Define the data here based on Kora_Consolidated_Properties CSV
    properties_data = [
        {
            "id": "PROP-001",
            "name": "IL Vento Residences",
            "tagline": "Modern waterfront living in Dubai Maritime City",
            "project": "IL Vento",
            "location": "Dubai Maritime City, Dubai, UAE",
            "price": 815959,
            "size": 516,
            "bedrooms": 0,
            "bathrooms": 1,
            "status": "Available",
            "type": "Residential",
            "images": [
                "https://images.kora.app/c9f19ed1-7d73-4dff-9d3d-195e672f3fa1.jpg",
                "https://images.kora.app/1fdd3f85-c54d-40d4-805a-d164bcab53c0.jpg",
                "https://images.kora.app/fe09213e-5d34-4998-8315-69e88fa71183.jpg",
            ],
            "description": "IL Vento Residences offers premium waterfront living in the heart of Dubai Maritime City. With stunning marina, sea, and city views, these residences feature modern architecture and world-class amenities.",
            "amenities": [
                "Swimming Pool",
                "Gym",
                "Concierge",
                "Covered Parking",
                "Marina Access",
                "Retail Outlets",
            ],
            "features": {
                "parking": 1,
                "balcony": True,
                "furnished": False,
                "view": "Marina View",
            },
            "proximity": [
                {
                    "name": "Dubai Marina Mall",
                    "time": "10 min",
                    "icon": "shopping-bag",
                },
                {
                    "name": "Palm Jumeirah",
                    "time": "15 min",
                    "icon": "palm-tree",
                },
                {
                    "name": "Dubai Metro",
                    "time": "8 min",
                    "icon": "train",
                },
            ],
            "handoverDate": "2026 Q2",
        },
        {
            "id": "PROP-002",
            "name": "Vento Harbour Views",
            "tagline": "Harbour living redefined in Maritime City",
            "project": "IL Vento",
            "location": "Dubai Maritime City, Dubai, UAE",
            "price": 729366,
            "size": 473,
            "bedrooms": 0,
            "bathrooms": 1,
            "status": "Available",
            "type": "Residential",
            "images": [
                "https://images.kora.app/86d6c63c-6dff-4db7-9be8-8e518ec7a968.jpg",
                "https://images.kora.app/7b804ee2-254f-4b24-a4dc-91e58e3924f8.jpg",
                "https://images.kora.app/34ad86aa-cb40-4b43-b07f-a71b45962eef.jpg",
            ],
            "description": "Vento Harbour Views offers spectacular harbour and sea views in Dubai Maritime City. Experience luxury living with premium finishes and thoughtfully designed spaces.",
            "amenities": [
                "Infinity Pool",
                "Fitness Center",
                "Kids Play Area",
                "BBQ Area",
                "24/7 Security",
                "Landscaped Gardens",
            ],
            "features": {
                "parking": 1,
                "balcony": True,
                "furnished": False,
                "view": "Sea View",
            },
            "handoverDate": "2026 Q3",
        },
        {
            "id": "PROP-003",
            "name": "La Marina Heights",
            "tagline": "Elevated living on Dubai Marina Walk",
            "project": "Dubai Marina Community",
            "location": "Dubai Marina Walk, Dubai, UAE",
            "price": 579464,
            "size": 452,
            "bedrooms": 0,
            "bathrooms": 1,
            "status": "Available",
            "type": "Residential",
            "images": [
                "https://images.kora.app/dcb1320f-2084-4415-b5d1-af2876ec8640.jpg",
                "https://images.kora.app/1c534667-8d92-4040-9882-d776c8ae2aef.jpg",
                "https://images.kora.app/4eba17dd-be4a-4834-b127-2a308bae366e.jpg",
            ],
            "description": "La Marina Heights brings you the best of Dubai Marina living. Located on the iconic Marina Walk, enjoy waterfront dining, retail, and entertainment at your doorstep.",
            "amenities": [
                "Rooftop Pool",
                "Gym",
                "Sauna",
                "Marina Walk Access",
                "Concierge",
                "Valet Parking",
            ],
            "features": {
                "parking": 1,
                "balcony": True,
                "furnished": False,
                "view": "Marina View",
            },
            "handoverDate": "2025 Q4",
        },
        {
            "id": "PROP-004",
            "name": "Marina Crest Residences",
            "tagline": "Iconic living on Al Marsa Street",
            "project": "Dubai Marina Community",
            "location": "Al Marsa St, Dubai Marina, UAE",
            "price": 544808,
            "size": 451,
            "bedrooms": 0,
            "bathrooms": 1,
            "status": "Available",
            "type": "Residential",
            "images": [
                "https://images.kora.app/f13b556c-9119-4bd6-9763-4e37dda580e8.jpg",
                "https://images.kora.app/7c6ea469-2d3f-4520-873e-5680781aa1a5.jpg",
                "https://images.kora.app/b2ce3bee-a74c-4e10-b384-8d4fae8459fa.jpg",
            ],
            "description": "Marina Crest Residences offers sophisticated urban living in the heart of Dubai Marina. Experience panoramic sea views, world-class amenities, and proximity to Dubai's best attractions.",
            "amenities": [
                "Infinity Edge Pool",
                "State-of-art Gym",
                "Spa & Wellness",
                "Business Center",
                "Children's Pool",
                "Jogging Track",
            ],
            "features": {
                "parking": 2,
                "balcony": True,
                "furnished": False,
                "view": "Sea View",
            },
            "handoverDate": "2027 Q1",
        },
        {
            "id": "PROP-005",
            "name": "Azure Bay Residences",
            "tagline": "Premium Downtown living on Sheikh Mohammed Bin Rashid Blvd",
            "project": "Downtown Community",
            "location": "Sheikh Mohammed Bin Rashid Blvd, Dubai, UAE",
            "price": 626710,
            "size": 490,
            "bedrooms": 0,
            "bathrooms": 1,
            "status": "Available",
            "type": "Residential",
            "images": [
                "https://images.kora.app/e218bade-1f48-4acf-b704-6ff59fa641bc.jpg",
                "https://images.kora.app/27702dfa-5c0f-487f-8ba1-6c6b7466c142.jpg",
                "https://images.kora.app/5e6be474-eab5-4d4e-a8b3-e2d5c6eacc44.jpg",
            ],
            "description": "Azure Bay Residences represents the pinnacle of Downtown Dubai living. Situated on the prestigious Sheikh Mohammed Bin Rashid Boulevard, enjoy proximity to Burj Khalifa, Dubai Mall, and the iconic Dubai Fountain.",
            "amenities": [
                "Sky Lounge",
                "Infinity Pool",
                "Premium Gym",
                "Spa",
                "Valet Parking",
                "24/7 Concierge",
                "Business Center",
            ],
            "features": {
                "parking": 2,
                "balcony": True,
                "furnished": False,
                "view": "Burj Khalifa View",
            },
            "proximity": [
                {
                    "name": "Burj Khalifa",
                    "time": "5 min",
                    "icon": "building",
                },
                {
                    "name": "Dubai Mall",
                    "time": "3 min",
                    "icon": "shopping-bag",
                },
                {
                    "name": "Dubai Opera",
                    "time": "7 min",
                    "icon": "music",
                },
            ],
            "handoverDate": "2026 Q4",
        },
    ]

    # Clear existing data
    await properties_collection.delete_many({})

    # Insert new data
    if properties_data:
        await properties_collection.insert_many(properties_data)

    return {"message": "Database seeded successfully", "count": len(properties_data)}
