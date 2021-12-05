import { render } from '@testing-library/react';
import Header from './Header';

describe("Header component testing", ()=>{

    it("rendered input", ()=>{
        const { getByTestId } = render(<Header></Header>)
        const input = getByTestId("input")
        expect(input).toBeTruthy();
    })
    it("rendered img", ()=>{
        const { getByTestId } = render(<Header></Header>)
        const img = getByTestId("searchLogo")
        expect(img).toBeTruthy();
    })
    it("rendered img", ()=>{
        const { getByTestId } = render(<Header></Header>)
        const img = getByTestId("logo")
        expect(img).toBeTruthy();
    })
})