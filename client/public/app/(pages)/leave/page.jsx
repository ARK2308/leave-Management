import LeaveRequest from "@/app/components/LeaveRequest";
import LeaveStatus from "@/app/components/LeaveStatus";

export default function Leave() {
    return (
        <div className=" text-black w-full ">
            <LeaveRequest />
            {/* <LeaveStatus /> */}
        </div>
    )
}