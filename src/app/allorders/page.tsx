"use client"
import React, { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

export default  function AllOrders() {

  const [orders, setOrders] = useState([])

  useEffect(()=>{
  
  



  async function getAllOrders() {

const token = localStorage.getItem("token")

const decoded: any = jwtDecode(token)

    const res = await fetch(
  `https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`,
  {
    headers: {
      token: localStorage.getItem("token") || ""
    }
  }
)


    const data = await res.json()

    setOrders(data)
  }

  getAllOrders()

  
  },[])
  

  return (
    <div className="w-[95%] mx-auto mt-10">
      <h1 className="font-bold text-4xl mb-10">All Orders</h1>

      {orders?.length === 0 && (
        <div className="text-center text-gray-500 text-xl">
          No Orders Yet
        </div>
      )}

      <div className="space-y-10">
        {orders?.map((order: any) => (
          <div
            key={order._id}
            className="border rounded-2xl p-6 shadow-lg bg-white"
          >
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <div>
                <h2 className="font-bold text-xl">
                  Order ID: {order._id}
                </h2>
                <p className="text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-4">
                <span
                  className={`px-4 py-2 rounded-xl text-white ${
                    order.isPaid ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>

                <span
                  className={`px-4 py-2 rounded-xl text-white ${
                    order.isDelivered ? "bg-blue-500" : "bg-yellow-500"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "Pending"}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {order.cartItems?.map((item: any) => (
                <div
                  key={item._id}
                  className="border rounded-xl p-4 flex gap-4 items-center"
                >
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div>
                    <h3 className="font-semibold line-clamp-1">
                      {item.product.title}
                    </h3>
                    <p className="text-gray-500">
                      Price: {item.price} EGP
                    </p>
                    <p className="text-gray-500">
                      Qty: {item.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right mt-6 font-bold text-xl">
              Total: {order.totalOrderPrice} EGP
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
