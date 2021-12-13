import React from 'react'
import EventListItem from './Event.ListItem'
export default function EventList({events, selectEvent}) {
    return (
    <div>
        {events.map(event =>(
             <EventListItem event={event} key={event.id} selectEvent={selectEvent}/>
        ))}
    </div>
    )
}