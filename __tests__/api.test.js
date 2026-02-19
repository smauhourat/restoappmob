import { getProducts, getOrders, getProviders, getProductsForProvider, createOrder } from '../lib/api';

global.fetch = jest.fn();

describe('API Functions', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('getProducts', () => {
    it('should fetch products successfully', async () => {
      const mockProducts = [{ id: 1, name: 'Product 1' }];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });

      const result = await getProducts();
      expect(result).toEqual(mockProducts);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/productos')
      );
    });

    it('should handle fetch error', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getProducts()).rejects.toThrow('Network error');
    });
  });

  describe('getOrders', () => {
    it('should fetch orders successfully', async () => {
      const mockOrders = [{ id: 1, estado: 'pendiente' }];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockOrders,
      });

      const result = await getOrders();
      expect(result).toEqual(mockOrders);
    });
  });

  describe('getProviders', () => {
    it('should fetch providers successfully', async () => {
      const mockProviders = [{ id: 1, nombre: 'Provider 1' }];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProviders,
      });

      const result = await getProviders();
      expect(result).toEqual(mockProviders);
    });
  });

  describe('getProductsForProvider', () => {
    it('should fetch products for a specific provider', async () => {
      const providerId = 'prov1';
      const mockProducts = [{ id: 1, name: 'Product 1' }];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });

      const result = await getProductsForProvider(providerId);
      expect(result).toEqual(mockProducts);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/api/proveedores/${providerId}/productos`)
      );
    });
  });

  describe('createOrder', () => {
    it('should create an order successfully', async () => {
      const mockOrderPayload = {
        proveedorId: 'prov1',
        fechaEntrega: '2024-01-15T10:00:00Z',
        items: [{ id: '1', nombre: 'Product 1', cantidad: 5, precio: 10 }],
      };
      const mockResponse = { id: 1, success: true };

      fetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ nro_pedido: 123 }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        });

      const result = await createOrder(mockOrderPayload);
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when order creation fails', async () => {
      const mockOrderPayload = {
        proveedorId: 'prov1',
        fechaEntrega: '2024-01-15T10:00:00Z',
        items: [{ id: '1', nombre: 'Product 1', cantidad: 5, precio: 10 }],
      };

      fetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ nro_pedido: 123 }),
        })
        .mockResolvedValueOnce({
          ok: false,
          text: async () => 'Error creating order',
        });

      await expect(createOrder(mockOrderPayload)).rejects.toThrow('Error creating order');
    });
  });
});
