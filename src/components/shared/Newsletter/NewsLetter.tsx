'use client'
import { Input, Button, Form, Typography } from 'antd'
import { MailOutlined } from '@ant-design/icons'

const { Title } = Typography

export default function NewsletterSignup() {
  const [form] = Form.useForm()

  const onFinish = (values: { email: string }) => {
    console.log('Email submitted:', values)
    // Handle newsletter subscription here
  }

  return (
    <div style={{ 
      backgroundColor: '#ffffff', 
      padding: '60px 20px',
      minHeight: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        width: '100%',
        textAlign: 'center'
      }}>
        <Title 
          level={2} 
          style={{ 
            color: '#2c3e50',
            marginBottom: '40px',
            fontSize: '32px',
            fontWeight: 600,
            lineHeight: '1.3'
          }}
        >
          Get luxury real estate updates in your inbox
        </Title>
        
       <div className='md:border md:bg-white py-2 p-3 rounded-md'>
         <Form
          form={form}
          onFinish={onFinish}
          style={{ 
            display: 'flex',
            gap: '20px',
            maxWidth: '800px',
            margin: '0 auto',
            flexWrap: 'wrap',
            borderRadius: '6px',
            borderBlockColor: '#d9d9d9'
          }}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email address' }
            ]}
            style={{ 
              flex: '1',
              minWidth: '300px',
              marginBottom: '0',
              marginRight: '0'
            }}
          >
            <Input
              placeholder="Enter email address*"
              prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
              size="large"
              style={{
                height: '50px',
                borderRadius: '6px 0 0 6px',
                border: '1px solid #d9d9d9',
                fontSize: '16px'
              }}
            />
          </Form.Item>
          
          <Form.Item style={{ marginBottom: '0' }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{
                height: '50px',
                backgroundColor: '#d4b896',
                borderColor: '#d4b896',
                borderRadius: '0 6px 6px 0',
                paddingLeft: '32px',
                paddingRight: '32px',
                fontSize: '16px',
                fontWeight: 500,
                boxShadow: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#c9a882'
                e.currentTarget.style.borderColor = '#c9a882'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#d4b896'
                e.currentTarget.style.borderColor = '#d4b896'
              }}
            >
              Subscribe
            </Button>
          </Form.Item>
        </Form>
       </div>
      </div>
    </div>
  )
}
