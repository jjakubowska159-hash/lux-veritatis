import { chooseVariant } from './utils/abExperiment.js'
import { isEnabled } from './utils/featureFlags.js'
import { logEvent } from './utils/telemetry.js'

export default function App() {
  // prosta identyfikacja użytkownika (możesz później podmienić)
  const userId = localStorage.getItem('user_id') || 'anon'
  const testName = 'istota_voice_test_1'

  // przydział wariantu A/B (A lub B) – sterowany flagą
  const variant = isEnabled('AB_TEST_ISTOTA_VOICE')
    ? chooseVariant({ userId, testName })
    : 'A'

  // zapisujemy zdarzenie do telemetrii (localStorage + opcjonalny webhook)
  logEvent('ab_variant_assigned', { testName, variant, userId })

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '24px' }}>
      <h1>Lux-Veritatis — Ogród Kolektywu</h1>
      <p>Wariant A/B: <b>{variant}</b>. Telemetria zapisana w localStorage.</p>
      <p style={{opacity:.7}}>Plik konfiguracyjny testu: <code>config/experiments.json</code>. Flagi: <code>src/utils/featureFlags.js</code>.</p>
    </div>
  )
}
