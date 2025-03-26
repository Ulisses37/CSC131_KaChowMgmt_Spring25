import Counter from "../models/Counter.js";

async function getNextTicketId() {
    try{
        const counter = await Counter.findOneAndUpdate(
            { name: 'ticketId'},
            { $inc: { count: 1 } },
            {new: true, upsert: true}
        );

        return String(counter.count).padStart(4, "0");
    } catch (error){
        console.log('Error Generating ticket ID: ', error.message);
        throw error;
    }
}

export default getNextTicketId;