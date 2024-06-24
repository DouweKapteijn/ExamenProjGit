import React from "react";
// import { Link } from "react-router-dom";

function AdminDashboard() {
    return (
        <div class="p-4 sm:ml-64 h-screen place-content-center">
            <div class="grid grid-cols-2 gap-4 mb-4 mt-48">
                <div class="flex items-center justify-center h-24 rounded bg-light-green">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">
                        Aanbiedingen
                    </p>
                </div>
                <div class="flex items-center justify-center h-24 rounded bg-light-green">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">
                        Nieuws
                    </p>
                </div>
            </div>    
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="flex items-center justify-center h-24 rounded bg-light-green">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">
                        Poplairste Soorten
                    </p>
                </div>
                <div class="flex items-center justify-center h-24 rounded bg-light-green">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">
                        Poplairste Rassen
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;