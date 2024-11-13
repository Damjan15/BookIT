import Heading from "@/components/Heading";
import getMyRooms from "@/actions/getMyRooms";
import MyRoomCard from "@/components/MyRoomCard";


export default async function MyRooms() {
    const rooms = await getMyRooms();

    return (
        <>
            <Heading title="My Rooms" />

            {rooms.length > 0 ? (
                rooms.map((room) => <MyRoomCard room={room} key={room.$id} />)
            ) : (
                <p>You have no room listings</p>
            )}
        </>
    )
}