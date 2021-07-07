import { clear } from 'console'
import { Http2ServerRequest } from 'http2'
import Cookie from 'js-cookie'
import { stringify } from 'querystring'
import { DataProvider, fetchUtils } from 'ra-core'
import { useParams } from 'react-router-dom'
import { IProductsDTO } from '../dtos/IProductsDTO'
import api from '../services/api'

const customDataProvider = (
  apiUrl: string,
  httpClient = fetchUtils.fetchJson
): DataProvider => ({
  getList: async (resource, params) => {
    const token = Cookie.get('token')

    const { filter } = params.filter
    const { page, perPage } = params.pagination

    const { data } = await api.get(
      `/${resource}?page=${page}&limit=${perPage}${filter ? `&${filter}` : ''}`,
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

        console.log(formData)

        const { data } = await api.post(`/${resource}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })

        return {
          data
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
