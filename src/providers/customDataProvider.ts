import { clear } from 'console'
import { Http2ServerRequest } from 'http2'
import Cookie from 'js-cookie'
import { stringify } from 'querystring'
import { DataProvider, fetchUtils } from 'ra-core'
import api from '../services/api'

const customDataProvider = (
  apiUrl: string,
  httpClient = fetchUtils.fetchJson
): DataProvider => ({
  getList: async (resource, params) => {
    const token = Cookie.get('token')

    const { page, perPage } = params.pagination
    const { order, field } = params.sort
    const filter = params.filter

    const { data } = await api.get(`/${resource}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    return {
      data: data.data,
      total: data.total_count
    }
  },

  getOne: async (resource, params) => {
    const token = Cookie.get('token')

    const { data } = await api.get(`/${resource}/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    return {
      data
    }
  },

  getMany: async (resource, params) => {
    const token = Cookie.get('token')

    const query = stringify({
      sort_by: 'fraction_buy'
    })

    const { data } = await api.get(`/${resource}/${params.ids}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    return {
      data
    }
  },

  create: async (resource, params) => {
    const token = Cookie.get('token')

    const { data } = await api.post(`/${resource}`, params.data, {
      headers: { Authorization: `Bearer ${token}` }
    })

    return {
      data
    }
  },

  getManyReference: async (resource, params) => {
    const query = stringify({
      sort_by: 'fraction_buy'
    })

    const { data } = await api.get(`/${resource}?${query}`, {
      method: 'GET'
    })

    return {
      data: data.data,
      total: data.total_count
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
    const query = stringify({
      filter: JSON.stringify({
        where: {
          id: { inq: params.ids }
        }
      })
    })

    await httpClient(`${apiUrl}/${resource}?${query}`, {
      method: 'DELETE'
    })

    return {
      data: params.ids
    }
  },

  update: async (resource, params) => {
    const token = Cookie.get('token')

    await api.put(`/${resource}/${params.id}`, params.data, {
      headers: { Authorization: `Bearer ${token}` }
    })

    return {
      data: {
        ...params.data
      }
    }
  },

  updateMany: async (resource, params) => {
    const query = stringify({
      filter: JSON.stringify({
        where: {
          id: { inq: params.ids }
        }
      })
    })

    await httpClient(`${apiUrl}/${resource}?${query}`, {
      method: 'PUT',
      body: JSON.stringify(params.data)
    })

    return {
      data: params.ids
    }
  }
})

export default customDataProvider
