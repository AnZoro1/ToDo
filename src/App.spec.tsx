import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { App } from 'antd'

describe("Renders App", () => {
    it("Renders App", () => {
        render(<App />)
    })
})