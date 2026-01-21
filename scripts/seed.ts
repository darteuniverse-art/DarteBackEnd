import mongoose from 'mongoose';
import { User, UserSchema, UserRole, UserStatus } from '../src/modules/users/schemas/user.schema';

async function seed() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI is required');
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD_HASH are required');
  }

  await mongoose.connect(mongoUri);

  const UserModel = mongoose.models.User || mongoose.model(User.name, UserSchema);

  await UserModel.findOneAndUpdate(
    { email: adminEmail.toLowerCase() },
    {
      $setOnInsert: {
        name: 'Admin',
        email: adminEmail.toLowerCase(),
        passwordHash: adminPasswordHash,
        role: UserRole.Admin,
        status: UserStatus.Active,
        isEmailVerified: true,
      },
    },
    { upsert: true },
  );

  await mongoose.disconnect();
}

seed().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
