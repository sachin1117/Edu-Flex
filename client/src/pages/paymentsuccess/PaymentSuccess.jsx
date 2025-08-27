import React from 'react'
import "./paymentSuccess.css"
import { Link, useParams } from 'react-router-dom'

const PaymentSuccess = ({ user }) => {
  const params = useParams();
  
  return (
    <div className="payment-success-page">
      {user && (
        <div className='success-message'>
          <div className="success-icon">✅</div>
          <h2>Payment Successful!</h2>
          <p>Your course subscription has been activated successfully.</p>
          <p>You can now access all course content from your dashboard.</p>
          
          <div className="reference">
            Reference: {params.id}
          </div>
          
          <Link to={`/${user._id}/dashboard`} className='btn-success'>
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  )
}

export default PaymentSuccess