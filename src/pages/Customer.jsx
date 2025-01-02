import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function OrdersPage() {
    const [customers, setCustomers] = useState(null);
    const convertDate = createdAt => {
        const newDate = Date(createdAt);
        const d = newDate.toString().split(' ');
        return d[1] + ' ' + d[2] + ' at ' + d[4];
    };
    useEffect(() => {
        axios
            .get('http://localhost:5000/shopify/fetch-customers/676bc84d2d6a8d748016594b')
            .then(response => {
                console.log(response.data[0]);
                setCustomers(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className=" m-auto">
            <table className="w-full text-center">
                <thead className="text-xs text-white uppercase bg-black overflow-x-auto">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Customer name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Note
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email subscription
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Location
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Orders
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount spent
                        </th>
                    </tr>
                </thead>
                <tbody className="text-xs">
                    {customers &&
                        customers.map((customer, index) => (
                            <tr key={index} className="border-b text-white dark:bg-gray-600">
                                <td className="px-6 py-4">{customer.first_name} {customer.last_name}</td>

                                <td className="px-6 py-4">{customer.note}</td>

                                <td className="px-6 py-4">{customer.email}</td>

                                <td className="px-6 py-4">{customer.addresses.city}</td>

                                <td className="px-6 py-4">{customer.orders_count}</td>

                                <td className="px-6 py-4">{customer.total_spent}</td>

                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
