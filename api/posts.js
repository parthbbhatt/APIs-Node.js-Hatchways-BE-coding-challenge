const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

router.get('/', (req, res) => {
    const queryParams = req.query;

    if(!queryParams.tags) {
        return res.status(400).json({ 'error': 'Tags parameter is required' });
    }

    // filtering by tags
    // split the query and fetch data from api for each tag
    // store into posts object and add each fetch call to promises
    const filters = queryParams.tags.split(',');

    let encounteredPosts = {};
    let promises = [];

    filters.forEach(tag => {
        const url = 'https://api.hatchways.io/assessment/blog/posts?tag=' + tag; 
        promises.push(
            fetch(url)
                .then(res => {
                    if(res.ok) {
                        return res.json();
                    }

                    return res.status(500).json({ error: 'Was not able to get blog posts' });
                })
                .then(data => {
                        data.posts.forEach(post => {
                            const postId = post.id;

                            if(!encounteredPosts[postId]) {
                                encounteredPosts[postId] = post;
                            }
                        })
                    }
                )
                .catch(error => { 
                    res.status(500).json({ error: 'Server error occured' });
                })
        );
    });

    // implementing sorting
    Promise.all(promises).then(() => {
        const taggedPosts = Object.values(encounteredPosts);
        let sortBy = 'id';
        let sortDir = 1; 

        if(queryParams.sortBy) {
            const sortQuery = queryParams.sortBy;

            if((sortQuery === 'id') ||
               (sortQuery === 'reads') || 
               (sortQuery === 'likes') || 
               (sortQuery === 'popularity')
            ) {
                sortBy = sortQuery;
            } else {
                return res.status(400).json({ 'error': 'sortBy parameter is invalid' });
            }
        }

        if(queryParams.direction) {
            const sortQuery = queryParams.direction;

            if(sortQuery === 'asc') {
                sortDir = 1;
            } else if(sortQuery === 'desc') {
                sortDir = 0;
            } else {
                return res.status(400).json({ 'error': 'direction parameter is invalid' });
            }
        }

        // main compare function for sorting posts
        const sortedPosts = taggedPosts.sort((postA, postB) => {
            if(!sortDir) {
                return postB[[sortBy]] - postA[[sortBy]];
            }

            return postA[[sortBy]] - postB[[sortBy]];
        });
        
        res.status(200).json({ 'posts': sortedPosts });
    });
});

module.exports = router;
