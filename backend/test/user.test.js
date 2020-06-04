const { strictEqual } = require('assert')
const { describe, it } = require('mocha')
const Client = require('./support/Client')

const operator = {
  user: 'operator',
  password: 'operator'
}

describe('user', () => {
  it('should allow the operator to create a user', async () => {
    const expected = {
      id: 'owner',
      label: 'Shop Owner',
      admin: true
    }

    const client = new Client()

    await client.basicLogin(operator)

    const created = await client.fetch('user/', {
      method: 'POST',
      body: JSON.stringify(expected)
    })

    strictEqual(created.status, 201)

    const fetched = await client.fetch('user/owner')
    const user = await fetched.json()

    strictEqual(fetched.status, 200)
    strictEqual(user.id, expected.id)
    strictEqual(user.label, expected.label)
    strictEqual(user.admin, expected.admin)
  })

  it('should allow an admin user to create a user', async () => {
    const owner = {
      id: 'owner',
      label: 'Shop Owner',
      admin: true
    }

    const expected = {
      id: 'employee',
      label: 'Shop Employee',
      admin: true
    }

    const client = new Client()

    await client.basicLogin(operator)

    const created = await client.fetch('user/', {
      method: 'POST',
      body: JSON.stringify(owner)
    })

    strictEqual(created.status, 201)

    const fetched = await client.fetch('user/owner')
    const user = await fetched.json()

    await client.logout()
    await client.tokenLogin(user)

    const createdByOwner = await client.fetch('user/', {
      method: 'POST',
      body: JSON.stringify(expected)
    })

    strictEqual(createdByOwner.status, 201)

    const fetchedByOwner = await client.fetch('user/employee')
    const userByOwner = await fetchedByOwner.json()

    strictEqual(fetchedByOwner.status, 200)
    strictEqual(userByOwner.id, expected.id)
    strictEqual(userByOwner.label, expected.label)
    strictEqual(userByOwner.admin, expected.admin)
  })
})
