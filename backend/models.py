
from pydantic import BaseModel
from typing import List, Optional, Dict
from enum import Enum

class PropertyStatus(str, Enum):
    AVAILABLE = 'Available'
    RESERVED = 'Reserved'
    SOLD = 'Sold'

class PropertyType(str, Enum):
    APARTMENT = 'Apartment'
    PENTHOUSE = 'Penthouse'
    VILLA = 'Villa'
    TOWNHOUSE = 'Townhouse'

class PropertyFeature(BaseModel):
    parking: Optional[int] = 0
    balcony: Optional[bool] = False
    furnished: Optional[bool] = False
    view: Optional[str] = None

class ProximityItem(BaseModel):
    name: str
    time: str
    icon: str

class PropertyModel(BaseModel):
    id: str
    name: str
    tagline: Optional[str] = None
    project: str
    location: str
    price: float
    size: float
    bedrooms: int
    bathrooms: int
    status: PropertyStatus
    type: str
    images: List[str]
    description: str
    amenities: List[str]
    features: PropertyFeature
    proximity: Optional[List[ProximityItem]] = []
    handoverDate: Optional[str] = None

class PropertyListResponse(BaseModel):
    properties: List[PropertyModel]

