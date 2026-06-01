from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    sku: str
    price: float
    quantity: int


class ProductUpdate(BaseModel):
    name: str
    sku: str
    price: float
    quantity: int


class CustomerCreate(BaseModel):
    fullname: str
    email: str
    phone: str


class CustomerUpdate(BaseModel):
    fullname: str
    email: str
    phone: str


class OrderCreate(BaseModel):
    customer_id: int
    product_id: int
    quantity: int