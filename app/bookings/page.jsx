import Heading from "@/components/Heading";
import getMyBookings from "@/actions/getMyBookings";
import BookedCardRoom from "@/components/BookedCardRoom";

export default async function Bookings(params) {
    const bookings = await getMyBookings();
    
    return (
        <div>
            {bookings.length === 0 ? (
                <p className="text-gray-600 mt-4">You have no bookings.</p>
            ) : (
                bookings.map((booking) => <BookedCardRoom booking={booking} key={booking.$id} />)
            )}
        </div>
    )
}