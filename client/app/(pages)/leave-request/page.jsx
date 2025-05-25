import LeaveRequest from "@/app/components/LeaveRequest";
import LeaveStatus from "@/app/components/LeaveStatus";
import withAuth from "@/app/components/WithAuth";

// export default withAuth(LeaveRequest, ['employee']);

export default function Leave() {
    return (
        <div className=" text-black w-full ">
            <LeaveRequest />
            {/* <LeaveStatus /> */}
        </div>
    )
}