FROM nvidia/cuda:11.8.0-cudnn8-runtime-ubuntu22.04

# set working directory
WORKDIR /app

# install pip and git
RUN apt-get update && apt-get install -y python3-pip

# update pip
RUN pip3 install --upgrade pip

# install server deps
RUN pip3 install flask flask_cors

# install remaining deps
RUN pip3 install diffusers torch accelerate transformers

# RUN pip3 install tqdm Flask_RESTful flax==0.5.0

# RUN pip3 install Flask==2.1.0 Flask-Cors==3.0.9 Flask-RESTful==0.3.8 flax==0.5.0 tqdm flask_cloudflared accelerate transformers diffusers

# install jax[cuda]
RUN pip3 install --upgrade "jax[cuda]" -f https://storage.googleapis.com/jax-releases/jax_cuda_releases.html

RUN pip3 install transformers

# add source code
COPY . /app

# expose
EXPOSE 8080

# run server
ENTRYPOINT ["python3", "app.py", "--port", "8080"]
