FROM node:16

RUN mkdir -p /home/app/ && chown -R node:node /home/app
WORKDIR /home/app

# COPY --chown=node:node . .
COPY --chown=node:node package.json yarn.lock ./

USER node
RUN yarn install --frozen-lockfile

COPY --chown=node:node components ./components
COPY --chown=node:node pages ./pages
COPY --chown=node:node styles ./styles
COPY --chown=node:node public ./public
COPY --chown=node:node prisma ./prisma

USER node
RUN yarn build

EXPOSE 3000
CMD ["yarn", "dev"]