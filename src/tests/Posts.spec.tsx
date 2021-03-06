import { render,screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import Posts, {getStaticProps} from '../pages/posts'
import {getPrismicClient } from '../services/prismic';



const posts = [
    {   slug:'string',
        title:'string1',
        excerpt: 'string',
        updatedAt:'string'  
    }
]

jest.mock('../services/prismic')

describe('Posts page',()=>{

    it("renders correctly",()=>{

        render(<Posts posts={posts}/> )

        expect(screen.getByText("string1")).toBeInTheDocument()
    })

    it("loads initial data ",async ()=>{

        const getPrismicClientMocked = mocked(getPrismicClient)

        getPrismicClientMocked.mockReturnValueOnce({
            query:jest.fn().mockResolvedValueOnce({
                results:[
                    {
                        uid:'my-new-post',

                        data:{
                            title:[{
                                type:'heading',
                                text:'my-new-post'
                            }],

                            content:[{
                                type:'paragraph',
                                text:'my-new-post'
                            }],
                        },

                        last_publication_date:'04-01-2021'
                    }
                ]
            })
        } as any)

        const response = await getStaticProps({})

        expect(response).toEqual(
            expect.objectContaining({
                props:{
                    posts:[{
                        slug:'my-new-post',
                        title:'my-new-post',
                        excerpt:'my-new-post',
                        updatedAt:'01 de abril de 2021'
                    }]
                }
            })
        )
    })
})
