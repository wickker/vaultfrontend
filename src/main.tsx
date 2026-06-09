import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TraceType, DefaultPrivacyLevel } from '@cloudcare/browser-core'
import { datafluxRum } from '@cloudcare/browser-rum'
import App from './App.tsx'
import './index.css'
import Config from './configs/index.ts'
import ToastProvider from './contexts/useToastContext'

datafluxRum.init({
  applicationId: 'vault_frontend_dian',
  site: 'https://id1-rum-openway.truewatch.com',
  clientToken: '96723804cfb348ee8d6ca669fd3be0a2',
  env: 'production',
  version: '1.0.0',
  service: 'browser',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  compressIntakeRequests: true,
  trackUserInteractions: true,
  traceType: TraceType.DDTRACE,
  defaultPrivacyLevel: DefaultPrivacyLevel.ALLOW,
  allowedTracingOrigins: ['http://localhost:9000'],
})
datafluxRum.startSessionReplayRecording()

if (!Config.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk publishable key')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>
)
