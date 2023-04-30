start:
	docker build -f Dockerfile --target "prod" . -t "cardconjurer-client" && docker run -dit -h 127.0.0.1 -p 80:80 "cardconjurer-client"
