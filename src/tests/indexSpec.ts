import imgSize from "../index"
describe("Test Image Dimensions", function(){
    it("Return a number from a function", function(){
        expect(imgSize(20)).toEqual(20);
    })
})
