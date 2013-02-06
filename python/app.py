from werkzeug.wrappers import Request, Response

import model

# default is 'in memory'
db = model.Database()

@Request.application
def application(request):
    return Response('Hello World!')

if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple('localhost', 4000, application)
