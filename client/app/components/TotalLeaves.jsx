export default function TotalLeaves({pendingCount, approvedCount, paidCount, rejectedCount}) {
    return (
        <div className="grid grid-cols-4 text-black bg-white p-6 gap-4 shadow rounded-xl text-center">
            <div className="flex gap-3 items-center bg-yellow-100 p-4 rounded">
                <p className="text-4xl font-semibold">{pendingCount}</p>
                <p className="text-sm">Pending leave</p>

            </div>
            <div className="flex gap-3 items-center bg-green-100 p-4 rounded">
                <p className="text-4xl font-semibold">{approvedCount}</p>
                <p className="text-sm">Approved leave</p>

            </div>
            <div className="flex gap-3 items-center bg-blue-100 p-4 rounded">
                <p className="text-4xl font-semibold">{paidCount}</p>
                <p className="text-sm">Paid leave</p>

            </div>
            <div className="flex gap-3 items-center bg-red-100 p-4 rounded">
                <p className="text-4xl font-semibold">{rejectedCount}</p>
                <p className="text-sm">Rejected leave</p>

            </div>
        </div>
    )
}