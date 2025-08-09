// api/users/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Mock user data - replace with your actual database
const users = [
  {
    id: '1',
    name: 'Ajay Admin',
    username: 'ajay@admin.com',
    email: 'ajay@admin.com',
    password: '$2a$10$CwTycUXWue0Thq9StjUM0u/XP.VfNLqKJdJKJgNgYgJDVqxYb8GGu', // Ajay@9711
  },
  {
    id: '2',
    name: 'Test User',
    username: 'test@user.com',
    email: 'test@user.com',
    password: '$2a$10$CwTycUXWue0Thq9StjUM0u/XP.VfNLqKJdJKJgNgYgJDVqxYb8GGu', // Test@123
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Username and password are required',
        },
        { status: 400 }
      );
    }

    // Find user
    const user = users.find(
      (u) => u.username === username || u.email === username
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid credentials',
        },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid credentials',
        },
        { status: 401 }
      );
    }

    // Generate tokens (in production, use JWT with proper secret)
    const token = Buffer.from(
      JSON.stringify({
        userId: user.id,
        username: user.username,
        timestamp: Date.now(),
      })
    ).toString('base64');

    const refreshToken = Buffer.from(
      JSON.stringify({
        userId: user.id,
        type: 'refresh',
        timestamp: Date.now(),
      })
    ).toString('base64');

    // Return success response matching your API structure
    return NextResponse.json(
      {
        status: 'success',
        statusCode: 200,
        message: 'Login successful',
        data: {
          token,
          refreshToken,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.name,
            phone: null,
            role: 'admin',
            isActive: true,
            lastLogin: new Date().toISOString(),
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: new Date().toISOString(),
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed',
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed',
    },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed',
    },
    { status: 405 }
  );
}
