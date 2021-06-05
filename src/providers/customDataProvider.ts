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
    const { page, perPage } = params.pagination
    const { order, field } = params.sort
    const filter = params.filter

    const res = await httpClient(`${apiUrl}/${resource}`, {
      method: 'GET'
    })

    const { data, total_count } = res.json

    return {
      data,
      total: total_count
    }
  },

  getOne: async (resource, params) => {
    const res = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'GET'
    })

    return {
      data: res.json
    }
  },

  getMany: async (resource, params) => {
    const query = stringify({
      sort_by: 'fraction_buy'
    })

    const res = await httpClient(`${apiUrl}/${resource}?${query}`, {
      method: 'GET'
    })

    return {
      data: res.json
    }
  },

  create: async (resource, params) => {
    const token = Cookie.get('token')

    const response = await api.post(`${apiUrl}/${resource}`, params.data, {
      headers: { Authorization: `Bearer ${token}` }
    })

    return {
      data: response.data
    }
  },

  getManyReference: async (resource, params) => {
    const query = stringify({
      sort_by: 'fraction_buy'
    })

    const res = await httpClient(`${apiUrl}/${resource}?${query}`, {
      method: 'GET'
    })

    const { total_count } = res.json

    return {
      data: res.json,
      total: total_count
    }
  },

  delete: async (resource, params) => {
    await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE'
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
    await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
      headers: new Headers({})
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
