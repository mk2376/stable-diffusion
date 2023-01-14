# stable-diffusion
Stable Diffusion server and client

Build only:
```
# CPU or GPU version doesn't matter here
docker-compose -f docker-compose-cpu.yaml build
```

Start server and client:
```
# CPU version
docker-compose -f docker-compose-cpu.yaml up

# GPU version
docker-compose -f docker-compose-cuda.yaml up
```
or, if you want to start them in background:
```
# CPU version
docker-compose -f docker-compose-cpu.yaml up -d

# GPU version
docker-compose -f docker-compose-cuda.yaml up -d
```

Web UI is available on [http://localhost:3000/](http://localhost:3000/).

Notes:
- First build will take some time (10 min +).

## License

Project is licensed under the [MIT license](LICENSE).