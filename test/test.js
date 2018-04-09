const chai = require('chai')
const expect = chai.expect
const main = require('../assets/js/main')
// const config = require('../knexfile').test
chai.use(require('chai-as-promised'))

describe('The Vibe', function() {
  before(function() {
    let userMedia = document.querySelector('.user-media')
  })

  xdescribe('#getUserMedia()', function() {
    it('should return a list of all the users in the database', function() {
      return main.getUserMedia(1).then(result => {
        expect(userMedia.length).to.equal(4)

        // const user = result[0]
        // expect(user.id).to.be.ok
        // expect(user.name).to.be.ok
      })
    })
  })

  xdescribe('#getUserById()', function() {
    it('should return one user from the database', function() {
      return vibe.getUserById(1).then(result => {
        expect(result.length).to.equal(1)

        const row = result[0]
        expect(row.id).to.be.ok
        expect(row.name).to.be.ok
        expect(row.profile_pic).to.be.ok
        expect(row.bio).to.be.ok
      })
    })
  })

  xdescribe('#getUserImages()', function() {
    it('should return a list of all images in the database associated with that user', function() {
      return vibe.getUserImages(1).then(result => {
        expect(result.length).to.equal(3)

        const row = result[0]
        expect(row.title).to.be.ok
        expect(row.description).to.be.ok

      })
    })
  })

  xdescribe('#getFriends()', function() {
    it('should return a list of all friends associated with that user', function() {
      return vibe.getFriends(1).then(result => {
        expect(result.length).to.equal(2)

        const row = result[0]
        expect(row.followee_id).to.be.ok
        expect(row.profile_pic).to.be.ok
      })
    })
  })

  xdescribe('#uploadMedia()', function() {
    it('should upload an image to the database', function() {
      return vibe.uploadImage(1, 'example.com', 'image', 'title', 'description').then(images => {
        expect(images.length).to.equal(10)

        const row = images[images.length - 1]
        expect(row.url).to.equal('example.com')
      })
    })
  })

  xxdescribe('BONUS: #getCocktailsWithNestedIngredientsAndGlass()', function() {
    it('should return a list of all the cocktails with their ingredients and associated glass', function() {
      return main.getCocktailsWithNestedIngredientsAndGlass().then(cocktails => {
        expect(cocktails.length).to.equal(3)


      })
    })
  })
})