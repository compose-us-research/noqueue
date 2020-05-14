# API

## Shop

### GET /shop/:shop

Returns the shop configuration.

Example response:

```json
{
  "@id": "http://noqueue.example.org/shop/cat-food/",
  "label": "Cat food"
}
```

### PUT /shop/:shop

Updates the shop configuration.

Example request:

```json
{
  "label": "Cat food"
}
```

## Tickets

### POST /shop/:shop/ticket/

Issues a new ticket.
On success, the URL of the ticket can be found in the `location` header.

Example request:

```json
{
  "start": "2020-05-01T11:00:00Z",
  "end": "2020-05-01T11:15:00Z"
}
```

### GET /shop/:shop/ticket/available?start&end

Returns an overview of issued tickets for the given time frame.
`start` and `end` must be given as ISO date strings. 

Example response:

```json
[{
  "start": "2020-05-01T11:00:00Z",
  "end": "2020-05-01T11:15:00Z",
  "reserved": 1,
  "allowed": 2,
  "available": 1
}, {
  "start": "2020-05-01T11:15:00Z",
  "end": "2020-05-01T12:00:00Z",
  "reserved": 0,
  "allowed": 2,
  "available": 2
}]
```

### GET /shop/:shop/ticket/:ticket

Returns the data of an issued ticket.

Example response:

```json
{
  "@id": "http://noqueue.example.org/shop/cat-food/ticket/6c39f8e5-e085-49d0-a4bc-c4673768c4d2",
  "user": "default",
  "start": "2020-05-01T11:00:00Z",
  "end": "2020-05-01T11:15:00Z",
  "ready": false,
  "used": false
}
```

### PUT /shop/:shop/ticket/:ticket

Updates an issued ticket.

Example request:

```json
{
  "@id": "http://noqueue.example.org/shop/cat-food/ticket/6c39f8e5-e085-49d0-a4bc-c4673768c4d2",
  "user": "default",
  "start": "2020-05-01T11:00:00Z",
  "end": "2020-05-01T11:15:00Z",
  "ready": true,
  "used": false
}
```

## Time Slots

Time slots are defined for day of the week.
Because JSON/JavaScript lacks a good data type to represent parts of a timestamp, a `Date` is used where only the day of the week and time is evaluated.

### GET /shop/:shop/timeslot

Returns all time slots.

Example response:

```json
[{
  "@id": "http://noqueue.example.org/shop/cat-food/timeslot/1",
  "start": "2020-05-01T08:00:00Z",
  "end": "2020-05-01T12:00:00Z",
  "customers": 2
}, {
  "@id": "http://noqueue.example.org/shop/cat-food/timeslot/2",
  "start": "2020-05-01T13:00:00Z",
  "end": "2020-05-01T17:00:00Z",
  "customers": 4
}]
```

### POST /shop/:shop/timeslot/

Creates a new time slot.

Example request:

```json
{
  "start": "2020-05-01T08:00:00Z",
  "end": "2020-05-01T12:00:00Z",
  "customers": 2
}
```

### PUT /shop/:shop/timeslot/:timeslot

Updates a time slot.

Example request:

```json
{
  "start": "2020-05-01T08:00:00Z",
  "end": "2020-05-01T12:00:00Z",
  "customers": 3
}
```
