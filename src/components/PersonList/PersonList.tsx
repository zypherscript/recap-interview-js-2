import { useEffect, useState } from 'react';
import axios from 'axios';

const PersonList: React.FC = () => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [error, setError] = useState<string>('');

    interface Person {
        id: number;
        name: string;
        username: string;
        website: string;
        company: {
            name: string;
        };
    }

    useEffect(() => {
        axios.get<Person[]>('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                const persons = res.data;
                setPersons(persons);
            })
            .catch(_err => {
                setError('Error retrieving data');
            });
    }, []);

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Website
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Company
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {error ? (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td colSpan={4} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{error}</td>
                        </tr>
                    ) : (
                        persons.map(person => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={person.id}>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {person.name}
                                </th>
                                <td className="px-6 py-4">{person.username}</td>
                                <td className="px-6 py-4">{person.website}</td>
                                <td className="px-6 py-4">{person.company.name}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PersonList;
