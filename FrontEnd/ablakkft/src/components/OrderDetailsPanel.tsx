import { useEffect, useState } from 'react'
import { getOrderById } from '../services/orders'
import { getUserById } from '../services/users'

interface Props {
  orderId?: number | string | null;
  onClose: () => void;
}

function OrderDetailsPanel({ orderId, onClose }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [order, setOrder] = useState<any | null>(null)
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    if (!orderId || typeof orderId !== 'number') {
      setOrder(null)
      setUser(null)
      return
    }
    (async () => {
      setLoading(true)
      setError(null)
      try {
        const o = await getOrderById(orderId)
        setOrder(o)
        if (o.userId) {
          const u = await getUserById(o.userId)
          setUser(u)
        }
      } catch (err: any) {
        setError(err?.message ?? String(err))
      } finally {
        setLoading(false)
      }
    })()
  }, [orderId])

  if (!orderId) return null

  return (
    <div className="fixed right-0 top-0 h-full w-[420px] bg-white dark:bg-gray-900 shadow-lg border-l border-gray-200 dark:border-gray-700 z-40">
      <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-semibold">Rendelés részletei</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
        {loading && <div>Betöltés...</div>}
        {error && <div className="text-red-500">Hiba: {error}</div>}
        {order && (
          <div className="space-y-4">
            <section className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
              <div className="text-sm text-gray-500">Rendelés ID</div>
              <div className="font-medium">#{order.id}</div>
              <div className="text-sm text-gray-500 mt-2">Állapot</div>
              <div className="font-medium">{order.status}</div>
            </section>

            <section className="p-3 rounded border border-gray-100 dark:border-gray-800">
              <div className="text-sm text-gray-500">Termék</div>
              <div className="font-medium">P:{order.productId} — Mennyiség: {order.quantity}</div>
              <div className="text-sm text-gray-500 mt-2">Szállítási cím</div>
              <div className="font-medium">{order.shipping_adress}</div>
              <div className="text-sm text-gray-500 mt-2">Létrehozva</div>
              <div className="font-medium">{new Date(order.order_date).toLocaleString()}</div>
            </section>

            <section className="p-3 rounded bg-gray-50 dark:bg-gray-800">
              <div className="text-sm text-gray-500">Megrendelő</div>
              {user ? (
                <div className="mt-2">
                  <div className="font-medium">{user.fullName} ({user.username})</div>
                  <div className="text-sm text-gray-500">Email: {user.email}</div>
                  <div className="text-sm text-gray-500">Telefon: {user.phone}</div>
                </div>
              ) : (
                <div className="text-sm text-gray-500 mt-2">Nincs felhasználói adat</div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderDetailsPanel
