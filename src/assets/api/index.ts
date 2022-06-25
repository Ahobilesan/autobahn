import { POST, RESULT } from "./interface";

const Rest = "https://jsonplaceholder.typicode.com/";

export default {
    get: async function (id: number): Promise<RESULT> {

        try {
            let res = await fetch(`${Rest}posts/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            let post = await res.json();
            return {
                error: false,
                data: post
            }
        } catch (error) {
            console.log("Error from API Get Method", error)

            return {
                error: true
            }
        }
    },
    getAll: async function (): Promise<RESULT> {
        try {
            let res = await fetch(`${Rest}posts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            let res_p = await fetch(`${Rest}photos/?albumId=1&albumId=2`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            let photos = await res_p.json();
            let posts = await res.json();
            posts.forEach((element: any, id: number) => {
                element.url = photos[id].url;
                element.thumbnailUrl = photos[id].thumbnailUrl;
            });
            return {
                error: false,
                data: posts
            }
        } catch (error) {
            console.log("Error from API Get All Method", error)

            return {
                error: true
            }
        }
    },
    create: async function (post: POST) {
        try {
            await fetch(`${Rest}posts`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(post)
                }
            );
            return {
                error: false
            }
        } catch (error) {
            console.log("Error from API Create Method", error)

            return {
                error: true
            }
        }
    },
    update: async function (post: POST) {
        try {
            await fetch(`${Rest}posts`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(post)
                }
            );
            return {
                error: false
            }
        } catch (error) {
            console.log("Error from API Update Method", error)

            return {
                error: true
            }
        }
    },
    delete: async function (id: number) {
        try {
            await fetch(`${Rest}posts/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return {
                error: false
            }
        } catch (error) {
            console.log("Error from API Delete Method", error)

            return {
                error: true
            }
        }
    },
}