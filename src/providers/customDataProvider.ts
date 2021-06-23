import { clear } from 'console'
import { Http2ServerRequest } from 'http2'
import Cookie from 'js-cookie'
import { stringify } from 'querystring'
import { DataProvider, fetchUtils } from 'ra-core'
import { IProductsDTO } from '../dtos/IProductsDTO'
import api from '../services/api'

const customDataProvider = (
  apiUrl: string,
  httpClient = fetchUtils.fetchJson
): DataProvider => ({
  getList: async (resource, params) => {
    const token = Cookie.get('token')

    const { page, perPage } = params.pagination

    const { data } = await api.get(
      `/${resource}?page=${page}&limit=${perPage}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    console.log(params)

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
      params.data.hasOwnProperty('image') ||
      params.data.hasOwnProperty('updated_at') ||
      params.data.hasOwnProperty('created_at')
    ) {
      delete params.data.image
      delete params.data.updated_at
      delete params.data.created_at
    }

    const { data } = await api.post(`/${resource}`, params.data, {
      headers: { Authorization: `Bearer ${token}` }
    })

    return {
      data
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

    console.log(params)

    await Promise.all(
      params.ids.map(id => {
        return api.delete(`/${resource}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      })
    )

    return {
      data: params.ids
    }
  },

  update: async (resource, params) => {
    const token = Cookie.get('token')

    delete params.data.id

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
    const token = Cookie.get('token')

    await Promise.all(
      params.ids.map(async id => {
        const { data } = await api.put(`${resource}/${id}`, params.data, {
          headers: { Authorization: `Bearer ${token}` }
        })

        return data
      })
    )

    return {
      data: params.ids
    }
  }
})

export default customDataProvider
