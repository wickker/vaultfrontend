import axios, { AxiosRequestConfig } from 'axios'
import {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '@/@types/categories'
import { CreateItemRequest, Item, UpdateItemRequest } from '@/@types/items'
import {
  CreateRecordRequest,
  GetRecordsByItemResponse,
  Record,
  UpdateRecordRequest,
} from '@/@types/records'
import Config from '@/configs'

const vaultApi = axios.create({
  baseURL: `${Config.VITE_BE_BASE_URL}/protected`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// GET
const getCategories =
  (config: Promise<AxiosRequestConfig>) => async (): Promise<Array<Category>> =>
    vaultApi.get('/categories', await config).then((res) => res.data)

const getItems =
  (config: Promise<AxiosRequestConfig>) => async (): Promise<Array<Item>> =>
    vaultApi.get('/items', await config).then((res) => res.data)

const getRecordsByItem =
  (config: Promise<AxiosRequestConfig>) =>
  async (): Promise<GetRecordsByItemResponse> =>
    vaultApi.get('/records', await config).then((res) => res.data)

// POST
const createCategory =
  (config: Promise<AxiosRequestConfig>) =>
  async (request: CreateCategoryRequest): Promise<Category> =>
    vaultApi.post('/categories', request, await config).then((res) => res.data)

const createItem =
  (config: Promise<AxiosRequestConfig>) =>
  async (request: CreateItemRequest): Promise<Item> =>
    vaultApi.post('/items', request, await config).then((res) => res.data)

const createRecord =
  (config: Promise<AxiosRequestConfig>) =>
  async (request: CreateRecordRequest): Promise<Record> =>
    vaultApi.post('/records', request, await config).then((res) => res.data)

// PUT
const updateCategory =
  (config: Promise<AxiosRequestConfig>) =>
  async (request: UpdateCategoryRequest): Promise<Category> =>
    vaultApi
      .put(
        `/categories/${request.id}`,
        { name: request.name, color: request.color },
        await config
      )
      .then((res) => res.data)

const updateItem =
  (config: Promise<AxiosRequestConfig>) =>
  async (request: UpdateItemRequest): Promise<Item> =>
    vaultApi
      .put(
        `/items/${request.id}`,
        { name: request.name, category_id: request.category_id },
        await config
      )
      .then((res) => res.data)

const updateRecord =
  (config: Promise<AxiosRequestConfig>) =>
  async (request: UpdateRecordRequest): Promise<Record> =>
    vaultApi
      .put(
        `/records/${request.id}`,
        { name: request.name, value: request.value },
        await config
      )
      .then((res) => res.data)

// DELETE
const deleteCategory =
  (config: Promise<AxiosRequestConfig>) =>
  async (id: number): Promise<null> =>
    vaultApi.delete(`/categories/${id}`, await config).then((res) => res.data)

const deleteItem =
  (config: Promise<AxiosRequestConfig>) =>
  async (id: number): Promise<null> =>
    vaultApi.delete(`/items/${id}`, await config).then((res) => res.data)

const deleteRecord =
  (config: Promise<AxiosRequestConfig>) =>
  async (id: number): Promise<null> =>
    vaultApi.delete(`/records/${id}`, await config).then((res) => res.data)

export default {
  createCategory,
  createItem,
  createRecord,
  deleteCategory,
  deleteItem,
  deleteRecord,
  getCategories,
  getItems,
  getRecordsByItem,
  updateCategory,
  updateItem,
  updateRecord,
}
