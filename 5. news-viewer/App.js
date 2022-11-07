import { Nav, NewsList } from './components/index.js';

const $root = [...document.querySelectorAll('#root')];

for(let i = 0; i < $root.length; i++) {
    const newsListDOM = new NewsList;
    const navDOM = new Nav; 
    $root[i].appendChild(navDOM);
    $root[i].appendChild(newsListDOM);
    
    newsListDOM.updateNewsList('all', 1, 5)

    
    const newsListDOMProxy = new Proxy(newsListDOM, {
        set: (object, property, value) => {
            object[property] = value;
            console.log(object['page']);
            return true;
        }, 
        
        get: (object, property) => {
            return object[property];
        }
    });

    navDOM.addEventListener ('click', event => {
        if ([...event.target.classList].includes('category-item')) {
            navDOM.querySelector('.active').classList.remove('active');
            event.target.classList.add('active');
            newsListDOM.clearNewsList();
            newsListDOMProxy.category = event.target.id;
            newsListDOMProxy.page = 1;
            let $cateogry = newsListDOMProxy['category'];
            let $pg = newsListDOMProxy['page'];
            let $sz = newsListDOMProxy['size'];
            newsListDOMProxy.updateNewsList($cateogry, $pg, $sz);
        }
    });
}

