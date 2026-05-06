import React, { useState, useMemo } from 'react';
import { ShoppingCart, X, Plus, Minus, Check } from 'lucide-react';

const TiendaPanambi = () => {
  // PRODUCTOS - EDITABLE
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Tarta de Queso',
      price: 25,
      image: '🧀',
      description: 'Cremosa, elegante, irresistible'
    },
    {
      id: 2,
      name: 'Tarta de Pistacho',
      price: 28,
      image: '🥜',
      description: 'Sabores sofisticados en cada bocado'
    },
    {
      id: 3,
      name: 'Baklava Artesanal',
      price: 18,
      image: '🍯',
      description: 'Capas de perfección'
    },
    {
      id: 4,
      name: 'Cookies Premium',
      price: 12,
      image: '🍪',
      description: 'Pequeño lujo para cada momento'
    },
    {
      id: 5,
      name: 'Tarta Personalizada (2kg)',
      price: 45,
      image: '🎂',
      description: 'Tu diseño, nuestra dedicación'
    },
    {
      id: 6,
      name: 'Brownie de Chocolate',
      price: 15,
      image: '🍫',
      description: 'Intensidad sin compromiso'
    },
    {
      id: 7,
      name: 'Cheesecake de Frutos Rojos',
      price: 32,
      image: '🫐',
      description: 'Frescor y cremosidad juntos'
    },
    {
      id: 8,
      name: 'Tarta de Matcha',
      price: 30,
      image: '🍵',
      description: 'Elegancia asiática, sabor refinado'
    },
    {
      id: 9,
      name: 'Lemon Pie Artesanal',
      price: 22,
      image: '🍋',
      description: 'Cítrico, fresco y sofisticado'
    }
  ]);

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'shipping', 'payment', 'success'
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'card'
  });

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep('shipping');
  };

  const handlePayment = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    // Simular checkout exitoso
    setShowSuccessMessage(true);
    setTimeout(() => {
      setCheckoutStep('success');
      setCart([]);
      setFormData({ name: '', email: '', phone: '', address: '', city: '', paymentMethod: 'card' });
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{
      fontFamily: "'Lato', 'Segoe UI', sans-serif",
      backgroundColor: '#FFFFFF',
      minHeight: '100vh',
      color: '#1A1A1A'
    }}>
      {/* HEADER */}
      <header style={{
        borderBottom: '1px solid #E8E8E8',
        padding: '2rem 2%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{ fontSize: '2rem', fontWeight: '700', letterSpacing: '-1px' }}>
          <span style={{ color: '#D4AF37' }}>◆</span> Panambí Dulce
        </div>
        <button
          onClick={() => setShowCart(true)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            padding: '0.5rem'
          }}
        >
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-8px',
              backgroundColor: '#D4AF37',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* HERO */}
      <section style={{
        padding: '4rem 2%',
        textAlign: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '300',
          letterSpacing: '-2px',
          marginBottom: '1rem',
          lineHeight: '1.2'
        }}>
          Pastelería Artesanal
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#888780',
          marginBottom: '2rem',
          fontWeight: '300'
        }}>
          Donde la sofisticación encuentra cada bocado
        </p>
      </section>

      {/* GALERÍA DE PRODUCTOS */}
      <section style={{
        padding: '0 2%',
        maxWidth: '1400px',
        margin: '0 auto 4rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem'
        }}>
          {products.map(product => (
            <div
              key={product.id}
              style={{
                border: '1px solid #E8E8E8',
                padding: '2rem 1.5rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D4AF37';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E8E8E8';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                {product.image}
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>
                {product.name}
              </h3>
              <p style={{
                color: '#888780',
                fontSize: '0.95rem',
                marginBottom: '1.5rem',
                minHeight: '2.5rem'
              }}>
                {product.description}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#D4AF37'
                }}>
                  {product.price}€
                </span>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    background: '#1A1A1A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.8rem 1.2rem',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'background 0.3s',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#D4AF37'}
                  onMouseLeave={(e) => e.target.style.background = '#1A1A1A'}
                >
                  Añadir
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid #E8E8E8',
        padding: '2rem 2%',
        textAlign: 'center',
        color: '#888780',
        fontSize: '0.9rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <p>Madrid | Entregas en 24-48h</p>
        <p style={{ marginTop: '0.5rem' }}>Encargos: info@panambi-dulce.com</p>
      </footer>

      {/* CARRITO MODAL */}
      {showCart && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'flex-end',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            width: '100%',
            maxWidth: '450px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideIn 0.3s ease'
          }}>
            {/* Header del carrito */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.5rem',
              borderBottom: '1px solid #E8E8E8'
            }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '500' }}>Tu carrito</h2>
              <button
                onClick={() => setShowCart(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Contenido */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {checkoutStep === 'cart' && (
                <>
                  {cart.length === 0 ? (
                    <p style={{ color: '#888780', textAlign: 'center', paddingTop: '2rem' }}>
                      Tu carrito está vacío
                    </p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {cart.map(item => (
                        <div
                          key={item.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingBottom: '1rem',
                            borderBottom: '1px solid #E8E8E8'
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
                              {item.name}
                            </p>
                            <p style={{ color: '#888780', fontSize: '0.9rem' }}>
                              {item.price}€ x {item.quantity}
                            </p>
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              style={{
                                background: '#F5F5F0',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.4rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Minus size={16} />
                            </button>
                            <span style={{ width: '30px', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              style={{
                                background: '#F5F5F0',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.4rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Plus size={16} />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#888780',
                                padding: '0.4rem'
                              }}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {checkoutStep === 'shipping' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '1rem' }}>
                    Información de envío
                  </h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      padding: '0.8rem',
                      border: '1px solid #E8E8E8',
                      borderRadius: '4px',
                      fontSize: '0.95rem'
                    }}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      padding: '0.8rem',
                      border: '1px solid #E8E8E8',
                      borderRadius: '4px',
                      fontSize: '0.95rem'
                    }}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      padding: '0.8rem',
                      border: '1px solid #E8E8E8',
                      borderRadius: '4px',
                      fontSize: '0.95rem'
                    }}
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Dirección"
                    value={formData.address}
                    onChange={handleInputChange}
                    style={{
                      padding: '0.8rem',
                      border: '1px solid #E8E8E8',
                      borderRadius: '4px',
                      fontSize: '0.95rem'
                    }}
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="Ciudad/Municipio"
                    value={formData.city}
                    onChange={handleInputChange}
                    style={{
                      padding: '0.8rem',
                      border: '1px solid #E8E8E8',
                      borderRadius: '4px',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>
              )}

              {checkoutStep === 'payment' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '1rem' }}>
                    Método de pago
                  </h3>
                  <div style={{
                    padding: '1rem',
                    border: '1px solid #D4AF37',
                    borderRadius: '4px',
                    backgroundColor: '#FFFEF5'
                  }}>
                    <p style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
                      Pago con Stripe
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#888780' }}>
                      Serás redirigido a una página segura de pago
                    </p>
                  </div>
                </div>
              )}

              {checkoutStep === 'success' && (
                <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#D4AF37',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    animation: 'pulse 0.6s ease'
                  }}>
                    <Check size={30} color="#FFFFFF" />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    ¡Pedido confirmado!
                  </h3>
                  <p style={{ color: '#888780', fontSize: '0.95rem' }}>
                    Recibirás un email de confirmación pronto
                  </p>
                </div>
              )}
            </div>

            {/* Footer del modal */}
            <div style={{
              borderTop: '1px solid #E8E8E8',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                <span>Total:</span>
                <span style={{ color: '#D4AF37' }}>{cartTotal}€</span>
              </div>

              {checkoutStep === 'cart' && (
                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  style={{
                    backgroundColor: cart.length === 0 ? '#DDD' : '#1A1A1A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '1rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: cart.length === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  Proceder al pago
                </button>
              )}

              {checkoutStep === 'shipping' && (
                <button
                  onClick={() => setCheckoutStep('payment')}
                  style={{
                    backgroundColor: '#1A1A1A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '1rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Continuar al pago
                </button>
              )}

              {checkoutStep === 'payment' && (
                <button
                  onClick={handlePayment}
                  style={{
                    backgroundColor: '#D4AF37',
                    color: '#1A1A1A',
                    border: 'none',
                    padding: '1rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  Confirmar compra
                </button>
              )}

              {checkoutStep === 'success' && (
                <button
                  onClick={() => {
                    setShowCart(false);
                    setCheckoutStep('cart');
                  }}
                  style={{
                    backgroundColor: '#1A1A1A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '1rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Volver a la tienda
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        input::placeholder {
          color: #888780;
        }
        input:focus {
          outline: none;
          border-color: #D4AF37;
        }
      `}</style>
    </div>
  );
};

export default TiendaPanambi;
