import Cookie from 'js-cookie'
import { DataProvider, fetchUtils } from 'ra-core'
import { queryReducer } from 'react-admin'
import api from '../services/api'
import { buildQuery } from '../utils/buildQuery'
import phoneInputMask from '../utils/phoneInputMask'

const customDataProvider = (
  apiUrl: string,
  httpClient = fetchUtils.fetchJson
): DataProvider => ({
  getList: async (resource, params) => {
    const token = Cookie.get('token')

    const { filter } = params
    const { page, perPage } = params.pagination

    const filters = buildQuery(filter)

    const { data } = await api.get(
      `/${resource}?page=${page}&limit=${perPage}${
        filters.length !== 0 ? filters : ''
      }`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    return {
      data: data.data,
      total: data.total_count
    }
  },

  getOne: async (resource, params) => {
    const token = Cookie.get('token')

    switch (resource) {
      case 'lists': {
        const { data } = await api.get(`/${resource}/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        const { list, details } = data

        return {
          data: {
            ...list,
            details
          }
        }
      }

      default: {
        const { data } = await api.get(`/${resource}/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        return {
          data
        }
      }
    }
  },

  getMany: async (resource, params) => {
    const token = Cookie.get('token')

    const data = await Promise.all(
      params.ids.map(async id => {
        const { data } = await api.get(`${resource}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        return data
      })
    )

    return {
      data
    }
  },

  getManyReference: async (resource, params) => {
    const token = Cookie.get('token')

    const { page, perPage } = params.pagination

    const { data } = await api.get(
      `/${resource}?page=${page}&limit=${perPage}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    return {
      data: data.data,
      total: data.total_count
    }
  },

  create: async (resource, params) => {
    const token = Cookie.get('token')

    if (
      params.data.hasOwnProperty('updated_at') ||
      params.data.hasOwnProperty('created_at')
    ) {
      delete params.data.updated_at
      delete params.data.created_at
    }

    switch (resource) {
      case 'products': {
        const image = params.data.image

        delete params.data.image

        const { data } = await api.post(`/${resource}`, params.data, {
          headers: { Authorization: `Bearer ${token}` }
        })

        return {
          data,
          image
        }
      }

      case 'lists': {
        const formData = Object.assign({ status: 'created' }, params.data)

        const { data } = await api.post(`/${resource}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })

        return {
          data: {
            id: data.id,
            ...data
          }
        }
      }

      case 'users': {
        const phone = phoneInputMask(params.data.phone)
        params.data.phone = phone

        let formData = Object.assign({ role: 'p' }, params.data)

        const { data } = await api.post(`/${resource}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })

        const user_id = data.user.id

        return {
          data: {
            id: user_id,
            ...data
          }
        }
      }

      default: {
        const { data } = await api.post(`/${resource}`, params.data, {
          headers: { Authorization: `Bearer ${token}` }
        })

        return {
          data
        }
      }
    }
  },

  delete: async (resource, params) => {
    const token = Cookie.get('token')

    await api.delete(`/${resource}/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    return {
      data: params.previousData as any
    }
  },

  deleteMany: async (resource, params) => {
    const token = Cookie.get('token')

    const message = await Promise.all<string>(
      params.ids.map(id => {
        return api.delete(`/${resource}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      })
    )

    return {
      data: message
    }
  },

  update: async (resource, params) => {
    const token = Cookie.get('token')

    const { id } = params.data

    let image

    if (params.data.hasOwnProperty('image')) {
      image = params.data.image

      delete params.data.image
    }

    delete params.data.id
    delete params.data.image_url
    delete params.data.created_at
    delete params.data.updated_at

    const { data } = await api.put(`/${resource}/${id}`, params.data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return {
      data,
      image
    }
  },

  updateMany: async (resource, params) => {
    const token = Cookie.get('token')

    const data = await Promise.all(
      params.ids.map(async id => {
        const { data } = await api.put(`${resource}/${id}`, params.data, {
          headers: { Authorization: `Bearer ${token}` }
        })

        return data
      })
    )

    return {
      data
    }
  }
})

export default customDataProvider
