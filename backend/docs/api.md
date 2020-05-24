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
  "end": "2020-05-01T11:15:00Z",
  "contact": {
    "name": "Max Mustermann"
  }
}
```

### GET /shop/:shop/ticket/available?start&end

Returns an overview of issued tickets for the given time frame.
`start` and `end` must be given as ISO date strings.

Example response:

```json
{
  "member": [
    {
      "start": "2020-05-01T11:00:00Z",
      "end": "2020-05-01T11:15:00Z",
      "reserved": 1,
      "allowed": 2,
      "available": 1
    },
    {
      "start": "2020-05-01T11:15:00Z",
      "end": "2020-05-01T12:00:00Z",
      "reserved": 0,
      "allowed": 2,
      "available": 2
    }
  ]
}
```

### GET /shop/:shop/ticket/:ticket

Returns the data of an issued ticket.

Example response:

```json
{
  "start": "2020-05-01T11:00:00Z",
  "end": "2020-05-01T11:15:00Z",
  "contact": {
    "name": "Max Mustermann"
  }
}
```

### PUT /shop/:shop/ticket/:ticket

Updates an issued ticket.

Example request:

```json
{
  "start": "2020-05-01T11:00:00Z",
  "end": "2020-05-01T11:15:00Z",
  "contact": {
    "name": "Max Mustermann"
  }
}
```

## Time Slots

Time slots are defined for day of the week.
The day of the week is an integer as defined in [Date.getDay()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay).

### GET /shop/:shop/timeslot/

Returns all time slots.

Example response:

```json
{
  "member": [
    {
      "day": 3,
      "start": "08:00:00",
      "end": "12:00:00",
      "customers": 2,
      "minDuration": 5,
      "maxDuration": 30
    },
    {
      "day": 3,
      "start": "13:00:00",
      "end": "17:00:00",
      "customers": 4,
      "minDuration": 5,
      "maxDuration": 30
    }
  ]
}
```

### PUT /shop/:shop/timeslot/

Updates all time slots at once.

Example request:

```json
{
  "member": [
    {
      "day": 3,
      "start": "08:00:00",
      "end": "12:00:00",
      "customers": 3,
      "minDuration": 5,
      "maxDuration": 30
    }
  ]
}
```
