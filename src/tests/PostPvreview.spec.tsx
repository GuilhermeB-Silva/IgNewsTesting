import { render,screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";

import Post, {getStaticProps} from '../pages/posts/preview/[slug]'

import { useSession } from "next-auth/client";
import { useRouter} from 'next/router'
import { getPrismicClient } from "../services/prismic";



const post = {
    slug: "fake-post",
    title: " Fake post",
    content: "<p>Fake post excerpt</p>",
    updatedAt: "10 de Abril",
};

jest.mock('../services/prismic')
jest.mock('next-auth/client')
jest.mock('next/router')


describe('Posts preview page',()=>{

    it("renders correctly", () => {
        const useSessionMocked = mocked(useSession);
        useSessionMocked.mockReturnValueOnce([null, false]);
    
        render(<Post post={post} />);
    
        expect(screen.getByText("Fake post")).toBeInTheDocument();
        expect(screen.getByText("Fake post excerpt")).toBeInTheDocument();
      });

    it("redirects user to full  post when user is subscribed",async ()=>{

        const useSessionMocked = mocked(useSession);
        const useRouterMocked = mocked(useRouter)
        const pushMocked = jest.fn()

        useSessionMocked.mockReturnValueOnce([
            {activeSubscription:'fake'}, 
            false
        ] as any);

        useRouterMocked.mockReturnValueOnce({
            push:pushMocked
        } as any)

        render(<Post post={post} />);

        expect(pushMocked).toHaveBeenCalledWith('/posts/fake-post')
     
    })

        it("loads initial content",async ()=>{

            const getPrismicClientMocked = mocked(getPrismicClient)

            getPrismicClientMocked.mockReturnValueOnce({
                getByUID:jest.fn().mockResolvedValueOnce({
                    data:{
                        title:[{
                            type:'heading',text:'my new post'
                        }],
                        content:[{type:'paragraph',text:'post content'}]
                    },
                    last_publication_date:'04-01-2021'
                })
            } as any)

            const response = await getStaticProps({params:{
                slug:'my-new-post'
            }} as any)

            expect(response).toEqual(
                expect.objectContaining({
                props:{
                    post:{
                        slug:'my-new-post',
                        title:'my new post',
                        content:'<p>post content</p>',
                        updatedAt:'01 de abril de 2021'
                    }
                }
                })
            )

        })
})
