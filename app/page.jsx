import RoomCard from "@/components/RoomCard";
import rooms from "@/data/rooms.json";

export default function Home() {
  return (
    <div>
      {rooms.length > 0 ? (
        rooms.map((room) => <RoomCard key={room.$id} room={room} />)
      ) : (
        <p>No rooms available at the moment.</p>
      )}
    </div>
  );
}
