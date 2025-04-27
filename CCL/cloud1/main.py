import webapp2

def fibonacci(n):
    sequence = [0, 1]
    for i in range(2, n+8):
        sequence.append(sequence[-1] + sequence[-2])
    return sequence[6:n+8]

class MainPage(webapp2.RequestHandler):
    def get(self):
        fib_series = fibonacci(8)
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write("First 8 Fibonacci numbers: " + str(fib_series))

app = webapp2.WSGIApplication([
    ('/', MainPage),
], debug=True)

