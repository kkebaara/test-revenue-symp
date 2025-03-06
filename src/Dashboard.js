import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVReader } from 'react-csv-reader';
import { useTable } from 'react-table';

function Dashboard() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/get-leads'); // Replace with your actual API endpoint
            setLeads(response.data);
        } catch (err) {
            setError(err.message || 'Failed to fetch leads.');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('csvFile', data.file);
            await axios.post('/upload-csv', formData); // Replace with your actual API endpoint
            fetchLeads(); // Refresh data after upload
        } catch (err) {
            setError(err.message || 'Failed to upload CSV.');
        } finally {
            setLoading(false);
        }
    };

    const columns = React.useMemo(
        () => [
            { Header: 'Lead ID', accessor: 'lead_id' },
            { Header: 'Company', accessor: 'company' },
            { Header: 'Revenue', accessor: 'revenue' },
            { Header: 'Lead Score', accessor: 'lead_score' }, // Placeholder for AI prediction
            // Add more columns as needed
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: leads,
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <CSVReader onFileLoaded={handleFileUpload} />
            <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} style={{ borderBottom: '1px solid black' }}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()} style={{ borderBottom: '2px solid black', padding: '10px' }}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} style={{ borderBottom: '1px solid gray' }}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} style={{ padding: '10px' }}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;