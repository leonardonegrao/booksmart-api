import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import prisma from "../../utils/prisma";

import { r2 } from "../../lib/cloudflare";
import { env } from "../../utils/env";

import { CreateBookInput, UploadBookInput } from "./book.schema";

export async function createSignedUrl(input: UploadBookInput) {
  const { userId, name } = input;
  
  // TODO: verify userId

  const signedUrl = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: env.R2_BUCKET,
      Key: `${userId}/${name}-${randomUUID()}.epub`,
      ContentType: "application/epub+zip",
    }),
    { expiresIn: 300 }
  );

  return signedUrl;
}

export async function createBook(input: CreateBookInput) {
  const { name: filename, signedUrl: url, ...rest } = input;
  const book = await prisma.book.create({
    data: {
      ...rest,
      filename,
      url
    }
  });

  return book;
}