import { useSelector } from "react-redux";
import React from "react";

const Leaderboard = () => {
    const { users } = useSelector((state) => state.auth);

    return (
        <div className="p-6">
            <table className="w-full text-sm">
                <thead className="border-collapse table-auto table-header-group">
                    <tr className="table-row">
                        <th className="border border-solid bg-gray-200 text-left pl-4">Users</th>
                        <th className="border border-solid bg-gray-200">Answered</th>
                        <th className="border border-solid bg-gray-200">Created</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map over the user info and generate table rows */}
                    {Object.values(users)?.map((user) => (
                        <tr key={user.id}>
                            <td className="border border-solid text-left pl-4">
                                <div className="text-sm font-bold">{user.name}</div>
                                <div className="text-xs">{user.id}</div>
                            </td>
                            <td className="border border-solid">{Object.values(user.answers).length}</td>
                            <td className="border border-solid">{user.questions.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;